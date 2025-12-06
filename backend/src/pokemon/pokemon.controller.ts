import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  list(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('name') name: string,
  ) {
    return this.pokemonService.list(Number(page), Number(limit), name);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.pokemonService.getOne(Number(id));
  }
}
