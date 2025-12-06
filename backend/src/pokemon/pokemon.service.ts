import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import {
  PokeApiListResponse,
  PokeApiPokemonDetails,
} from './interfaces/pokemon.interface';

@Injectable()
export class PokemonService {
  private cache: { name: string; url: string }[] = [];

  private async loadAll() {
    if (this.cache.length > 0) return this.cache;

    const res = await axios.get<PokeApiListResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=20000',
    );

    this.cache = res.data.results;
    return this.cache;
  }

  async list(page = 1, limit = 20, name = '') {
    try {
      const all = await this.loadAll();

      const filtered = all.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase()),
      );

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      const detailed = await Promise.all(
        paginated.map(async (pokemon) => {
          const details = await axios.get<PokeApiPokemonDetails>(pokemon.url);

          return {
            id: details.data.id,
            name: pokemon.name,
            sprite: details.data.sprites.front_default,
            types: details.data.types.map((t) => t.type.name),
          };
        }),
      );

      return {
        data: detailed,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
        },
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
