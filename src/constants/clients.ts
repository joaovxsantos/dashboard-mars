import { Client } from "@/src/interface";

const FIRST_NAMES = [
  "Carla", "Ana", "Diego", "Bruno", "Eduardo", "Fernanda", "Gabriel", "Helena",
  "Igor", "Julia", "Lucas", "Mariana", "Nicolas", "Otavio", "Patricia", "Rafael",
  "Sabrina", "Thiago", "Vanessa", "William",
];

const LAST_NAMES = [
  "Nunes", "Ferreira", "Alves", "Costa", "Lima", "Reis", "Souza", "Martins",
  "Pereira", "Castro", "Oliveira", "Santos", "Rodrigues", "Almeida", "Barbosa",
  "Carvalho", "Dias", "Gomes", "Teixeira", "Vieira",
];

const TOTAL_CLIENTS = 148;

function buildClients(): Client[] {
  const clients: Client[] = [
    { id: "1", name: "Carla Nunes", email: "carla@email.com", orders: 27 },
    { id: "2", name: "Ana Ferreira", email: "ana@email.com", orders: 12 },
    { id: "3", name: "Diego Alves", email: "diego@email.com", orders: 8 },
    { id: "4", name: "Bruno Costa", email: "bruno@email.com", orders: 3 },
  ];

  for (let i = clients.length; i < TOTAL_CLIENTS; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length];

    clients.push({
      id: String(i + 1),
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@email.com`,
      orders: ((i * 7) % 30) + 1,
    });
  }

  return clients;
}

export const clients: Client[] = buildClients();
