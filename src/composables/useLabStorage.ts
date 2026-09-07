import { computed, ref } from 'vue';

export interface LabExperimentRecord {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: 'draft' | 'prototype' | 'active';
  content: string;
  updatedAt: string;
  year?: string;
}

const STORAGE_KEY = 'roottecnologias-lab-experiments';
const seededExperiments: LabExperimentRecord[] = [
  {
    id: 'example',
    title: 'Example Experiment',
    summary: 'Placeholder slot for a future interactive study.',
    category: 'Interface',
    status: 'prototype',
    content: '',
    updatedAt: new Date().toISOString(),
  },
];

function readExperiments(): LabExperimentRecord[] {
  if (typeof window === 'undefined') {
    return seededExperiments;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seededExperiments;
    }

    const parsed = JSON.parse(raw) as LabExperimentRecord[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seededExperiments;
  } catch {
    return seededExperiments;
  }
}

function persistExperiments(experiments: LabExperimentRecord[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments));
}

export function useLabStorage() {
  const experiments = ref<LabExperimentRecord[]>(readExperiments());

  const categories = computed(() => Array.from(new Set(experiments.value.map((experiment) => experiment.category))));

  function sync(nextExperiments: LabExperimentRecord[]) {
    experiments.value = nextExperiments;
    persistExperiments(nextExperiments);
  }

  function getExperiments() {
    return experiments.value;
  }

  function getExperiment(id: string) {
    return experiments.value.find((experiment) => experiment.id === id);
  }

  function saveExperiment(experiment: LabExperimentRecord) {
    if (getExperiment(experiment.id)) {
      return updateExperiment(experiment);
    }

    sync([experiment, ...experiments.value]);
  }

  function updateExperiment(experiment: LabExperimentRecord) {
    sync(
      experiments.value.map((currentExperiment) =>
        currentExperiment.id === experiment.id ? { ...experiment, updatedAt: new Date().toISOString() } : currentExperiment,
      ),
    );
  }

  function deleteExperiment(id: string) {
    sync(experiments.value.filter((experiment) => experiment.id !== id));
  }

  return {
    experiments,
    categories,
    getExperiments,
    getExperiment,
    saveExperiment,
    updateExperiment,
    deleteExperiment,
  };
}