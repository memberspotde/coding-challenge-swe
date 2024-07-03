import { EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

export interface SWCharactersState extends EntityState<SWCharactersEntity> {
  loading: boolean;
  error: HttpErrorResponse | null;
  total_pages: number;
  total_records: number;
  currentPage: number | null;
}

export interface SWCharactersEntity {
  pageId: number;
  characters: SWCharacter[];
}

export interface SWCharacter {
  name: string;
  description: string;
  gender: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  homeworld: string;
}

export interface SWCharactersPageResp {
  total_pages: number;
  total_records: number;
  results: { uid: string; name: string; url: string }[];
}

export interface SWCharacterResp {
  result: {
    properties: SWCharacter;
    description: string;
  };
}

export interface SWCharacterSearchResp {
  result: {
    properties: SWCharacter;
    description: string;
  }[];
}
