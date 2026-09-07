<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import SectionIntro from '@/components/ui/SectionIntro.vue';

type ContactForm = {
  name: string;
  email: string;
  category: string;
  description: string;
};

const form = reactive<ContactForm>({
  name: '',
  email: '',
  category: '',
  description: '',
});

const errors = reactive<Partial<Record<keyof ContactForm, string>>>({});
const submitted = ref(false);

const categories = ['Identity', 'Web design', 'Prototype', 'Experiment', 'Other'];

const canSubmit = computed(() => Object.values(form).some(Boolean));

function validate() {
  errors.name = form.name.trim() ? '' : 'Please add a name.';
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Add a valid email address.';
  errors.description = form.description.trim().length >= 20 ? '' : 'Tell us a little more about the project.';
  errors.category = form.category ? '' : 'Select a category or choose Other.';

  return !Object.values(errors).some(Boolean);
}

function submitForm() {
  submitted.value = false;
  if (!validate()) {
    return;
  }

  submitted.value = true;
  form.name = '';
  form.email = '';
  form.category = '';
  form.description = '';
}
</script>

<template>
  <div class="page contact-page">
    <SectionIntro
      eyebrow="Contacto"
      title="If there is something worth shaping, send it over."
      description="Use this form to start a conversation about a project, an experiment or a new direction. No pressure, no corporate script."
    />

    <section class="contact-layout">
      <form class="contact-form surface-panel" novalidate @submit.prevent="submitForm">
        <div class="field-group">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" type="text" autocomplete="name" />
          <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
        </div>

        <div class="field-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" />
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <div class="field-group">
          <label for="category">Project type</label>
          <select id="category" v-model="form.category">
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
          <p v-if="errors.category" class="field-error">{{ errors.category }}</p>
        </div>

        <div class="field-group field-group--wide">
          <label for="description">Project description</label>
          <textarea id="description" v-model="form.description" rows="6" placeholder="Tell us what you want to build, explore or re-think." />
          <p v-if="errors.description" class="field-error">{{ errors.description }}</p>
        </div>

        <div class="contact-form__actions">
          <button class="primary-button" type="submit" :disabled="!canSubmit">Send</button>
          <p class="form-hint">This is frontend-only for now. The structure is ready for a real service later.</p>
        </div>

        <p v-if="submitted" class="success-banner" role="status">Message ready. We would normally hand this to the studio inbox.</p>
      </form>

      <aside class="contact-aside surface-panel">
        <p class="section-label">Direct line</p>
        <a class="text-link text-link--large" href="mailto:hola@roottecnologias.studio">hola@roottecnologias.studio</a>
        <p class="contact-aside__copy">If email is easier, send a short note and we will continue from there.</p>
      </aside>
    </section>
  </div>
</template>