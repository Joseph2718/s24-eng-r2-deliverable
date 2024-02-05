"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({ species }: { species: Species }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} layout="fill" objectFit="cover" />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-3 w-full">Learn More</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Species Details</DialogTitle>
          <DialogDescription>Detailed information about the species.</DialogDescription>
          <div className="p-4">
            <p>
              <strong>Scientific Name:</strong> {species.scientific_name}
            </p>
            <p>
              <strong>Common Name:</strong> {species.common_name}
            </p>
            <p>
              <strong>Total Population:</strong> {species.total_population}
            </p>
            <p>
              <strong>Kingdom:</strong> {species.kingdom}
            </p>
            <p>
              <strong>Description:</strong> {species.description}
            </p>
          </div>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
