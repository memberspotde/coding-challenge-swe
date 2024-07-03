import { EntityState } from '@ngrx/entity';

export type HomeWorldState = EntityState<HomeWorld>;

export interface HomeWorld {
  url: string; // id
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
}

export interface HomeWorldResp {
  result: {
    properties: HomeWorld;
  };
}
