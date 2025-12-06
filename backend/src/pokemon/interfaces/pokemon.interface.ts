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
