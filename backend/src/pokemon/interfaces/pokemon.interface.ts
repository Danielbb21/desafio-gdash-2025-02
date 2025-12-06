export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokeApiPokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    [key: string]: any;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}
export interface OnePokemonCompleteDetail {
  id: number;
  height: number;
  weight: number;
  name: string;
  sprites: {
    front_default: string | null;
    [key: string]: any;
  };

  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];

  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
