export type StudioMember = {
  name: string;
  role: string;
  bio: string;
  offset?: 'left' | 'center' | 'right';
};

export type AestheticEntry = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  tags: string[];
  image: string;
};

export type LabExperiment = {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: 'draft' | 'prototype' | 'active';
  year: string;
};

const placeholderTexture =
  'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Cdefs%3E%3CradialGradient id=%22g%22 cx=%2250%25%22 cy=%2230%25%22 r=%2280%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23202633%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23090b10%22/%3E%3C/radialGradient%3E%3ClinearGradient id=%22l%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23d4b06f%22 stop-opacity=%220.22%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23ffffff%22 stop-opacity=%220.03%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22800%22 fill=%22url(%23g)%22/%3E%3Crect width=%221200%22 height=%22800%22 fill=%22url(%23l)%22/%3E%3Cg opacity=%220.22%22 stroke=%22%23ffffff%22 stroke-width=%221%22%3E%3Cpath d=%22M0 120H1200M0 240H1200M0 360H1200M0 480H1200M0 600H1200M0 720H1200%22/%3E%3Cpath d=%22M140 0V800M320 0V800M500 0V800M680 0V800M860 0V800M1040 0V800%22/%3E%3C/g%3E%3Cg opacity=%220.08%22 fill=%22%23ffffff%22%3E%3Ccircle cx=%22240%22 cy=%22210%22 r=%22140%22/%3E%3Ccircle cx=%22930%22 cy=%22540%22 r=%22220%22/%3E%3C/g%3E%3C/svg%3E';

export const studioMembers: StudioMember[] = [
  {
    name: 'Nombre Uno',
    role: 'Dirección / estrategia visual',
    bio: 'Define el tono, decide el encuadre y empuja la identidad hacia algo que no suene genérico.',
    offset: 'left',
  },
  {
    name: 'Nombre Dos',
    role: 'Diseño / interfaz / detalle',
    bio: 'Convierte la idea en superficies, ritmo y relaciones que se sientan precisas.',
    offset: 'center',
  },
  {
    name: 'Nombre Tres',
    role: 'Código / sistemas / interacción',
    bio: 'Construye la parte viva del sitio para que el diseño tenga comportamiento y memoria.',
    offset: 'right',
  },
];

export const aestheticEntries: AestheticEntry[] = [
  {
    slug: 'signal-garden',
    number: '06',
    title: 'Signal Garden',
    summary: 'A living interface where information behaves like a changing signal.',
    tags: ['generative', 'signal', 'ecosystem'],
    image: placeholderTexture,
  },
  {
    slug: 'swiss-system',
    number: '05',
    title: 'Swiss System',
    summary: 'A responsive typographic system where information becomes the image.',
    tags: ['grid', 'type', 'system'],
    image: placeholderTexture,
  },
  {
    slug: 'nocturne-grid',
    number: '04',
    title: 'Nocturne Grid',
    summary: 'An architectural interface for structures that only exist in motion.',
    tags: ['architecture', 'spatial', 'night study'],
    image: placeholderTexture,
  },
  {
    slug: 'terminal-bloom',
    number: '00',
    title: 'Terminal Bloom',
    summary: 'A botanical archive viewed through an early computational instrument.',
    tags: ['botanical', 'archive', 'interface'],
    image: placeholderTexture,
  },
  {
    slug: 'example',
    number: '01',
    title: 'Example Aesthetic',
    summary: 'Placeholder framework for a future visual direction.',
    tags: ['editorial', 'dark', 'experimental'],
    image: placeholderTexture,
  },
  {
    slug: 'signal-density',
    number: '02',
    title: 'Signal Density',
    summary: 'Space reserved for a sharper, more compressed composition.',
    tags: ['typography', 'contrast', 'motion'],
    image: placeholderTexture,
  },
  {
    slug: 'quiet-machines',
    number: '03',
    title: 'Quiet Machines',
    summary: 'A future aesthetic about restraint, precision and technical calm.',
    tags: ['minimal', 'technical', 'monochrome'],
    image: placeholderTexture,
  },
];

export const labExperiments: LabExperiment[] = [
  {
    id: 'example',
    title: 'Example Experiment',
    summary: 'Placeholder for a concept that can later become interactive.',
    category: 'Interface',
    status: 'prototype',
    year: '2026',
  },
  {
    id: 'motion-scratches',
    title: 'Motion Scratches',
    summary: 'An experiment slot for motion ideas and tiny interface studies.',
    category: 'Motion',
    status: 'draft',
    year: '2026',
  },
  {
    id: 'studio-archive',
    title: 'Studio Archive',
    summary: 'A place where small systems and reusable pieces can accumulate.',
    category: 'System',
    status: 'active',
    year: '2026',
  },
];