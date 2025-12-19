import type { Metadata } from 'next'
import { ServicesComponent } from "@/components/mods/services";
 
export const metadata: Metadata = {
  title: 'Our Services - RT Holdings',
  description: 'Explore the range of services provided by RT Holding.',
}

export default function Services() {

  return (
    <div>
      <ServicesComponent/>
    </div>
  );
}
