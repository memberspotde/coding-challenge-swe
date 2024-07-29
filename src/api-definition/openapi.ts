import { Express } from 'express';
import OpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { OpenAPIV3 } from 'openapi-types';


const baseUrl = 'http://localhost:3000'
const openapiDoc = YAML.load('./src/api-definition/openapi.yaml');

/** SETTING UP OPEN API  */
export function setupOpenApi(app: Express) {

  //assign baseurl of openapi
  openapiDoc.servers[0].url =  baseUrl;
  
  // Setup OpenApi
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));

  // Setup OpenAPI validator
  try {
    app.use(OpenApiValidator.middleware({
      apiSpec: './src/api-definition/openapi.yaml',
      validateRequests: true,
      validateResponses: true
    }));
  } catch (error) {
    console.error('Error setting up OpenApiValidator middleware:', error);
  }
 
}

/** Retrieving Info From OpenAPI as !One Source Of Truth!  */
export async function getOpenApiConfig(){
  //WARNING: hard-coded accessing of server - currently only one needed 
  const serverDescription = openapiDoc.servers[0].serverDescription
  const baseUrl =  openapiDoc.servers[0].url 

  const paths: OpenAPIV3.PathsObject = openapiDoc.paths;
}

export function getOpenApiPaths() {
  const paths: OpenAPIV3.PathsObject = openapiDoc.paths;
  return paths; 
}

export async function getOpenApiQueryParameters(path: string, method: string): Promise<string[]> {
  try {
    const paths = await getOpenApiPaths();
    //get OpenApi JSObect for the path 
    const pathObj = paths[path];
    if (!pathObj) return [];
  
    const methodKey = method.toLowerCase() as keyof OpenAPIV3.PathItemObject;
    const methodObj = pathObj[methodKey] as OpenAPIV3.OperationObject | undefined;
    console.log("method : " , pathObj[methodKey])
    if (!methodObj) return [];
  
    let parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] = [];

    if (Array.isArray(methodObj.parameters)) {
      parameters = methodObj.parameters;
      console.log("Parameters are array: ", parameters);
    } else if (methodObj.parameters) {
      console.log("Parameters are not array but exist: ", methodObj.parameters);
    } else {
      console.log("No parameters defined for method.");
    }
    
    const resolvedParameters = parameters.map(resolveParemeter)
  
    const queryParameters = resolvedParameters.filter(parameter => parameter.in === 'query');
  
    const queryParameterNames = queryParameters.map(parameter => parameter.name);
    return queryParameterNames;
  }
  catch(error){
    console.error("Error caused", error); 
    return []; 
  }
  
}

function resolveParemeter(parameter : any){
    if (isReferenceObject(parameter)) {
      console.log("Reference parameter: ", parameter);
      const resolvedParameter = resolveReference(parameter);
      return resolvedParameter as OpenAPIV3.ParameterObject;
    }
    return parameter as OpenAPIV3.ParameterObject
}

 function resolveReference(ref: OpenAPIV3.ReferenceObject): any {
  const refPath = ref.$ref.split('/').slice(1); // Remove the initial '#/'
  let current = openapiDoc;
  for (const part of refPath) {
    current = current[part];
  }
  return current;
}

function isReferenceObject(param: any): param is OpenAPIV3.ReferenceObject {
  return param && typeof param === 'object' && '$ref' in param;
}


