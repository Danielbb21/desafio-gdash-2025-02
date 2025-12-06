import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationButton, PaginationNext, PaginationPrevious, PaginationEllipsis
} from "@/components/ui/pagination";

import { useListPokemon } from "../hooks/pokemon/useListPokemon";
import { generatePages } from "../utils/generatePages";

export default function PokemonPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState(search);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearchName(search);
    }, 500);

    return () => {
      clearTimeout(timeOut);
    }
  }, [search])

  const { data, pagination, isLoading } = useListPokemon(searchName, page);
  const pages = useMemo(() => {
    if (!pagination) return [];
    return generatePages(pagination.page, pagination.totalPages);
  }, [pagination]);


  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-6 text-white" >
      <h1 className="text-3xl font-bold text-center mb-6">Pokémons</h1>

      <div className="flex justify-center mb-4">
        <Input
          placeholder="Buscar Pokémon"
          className="w-64"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="w-full h-12" />
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow >
              <TableHead className="text-white">#</TableHead>
              <TableHead className="text-white">Foto</TableHead>
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Tipos</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((poke) => (
              <TableRow key={poke.id}>
                <TableCell>{poke.id}</TableCell>
                <TableCell>
                  <img src={poke.sprite} className="w-12" />
                </TableCell>
                <TableCell className="capitalize">{poke.name}</TableCell>
                <TableCell>{poke.types.join(", ")}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Pagination className="mt-4 text-black">
        <PaginationContent>

          <PaginationItem>
            <PaginationPrevious
              disabled={!pagination || page === 1}
              onClick={() => setPage((p) => p - 1)}
            />
          </PaginationItem>

          {pages.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={i}>
                <PaginationButton
                  isActive={p === page}
                  onClick={() => setPage(Number(p))}
                >
                  {p}
                </PaginationButton>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!pagination || page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>

    </div>
  );
}
