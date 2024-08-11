<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useForm } from "vee-validate";
import * as yup from 'yup'
const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  defaultData: {
     type: Object,
     required: false
  }
});
const emits = defineEmits(['submit'])
const visible = ref(false);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: yup.object({
     title: yup.string().required(),
     description: yup.string().required(),
     contact: yup.string().required(),
  }),
});

const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');
const [contact, contactAttrs] = defineField('contact');

const onSubmit = handleSubmit(async (values) => {
     emits('submit', values)
     visible.value = false
     resetForm()
});

onMounted(() => {
     if(props.mode === 'edit') {
          title.value = props?.defaultData?.title || ''
          description.value = props?.defaultData?.description || ''
          contact.value = props?.defaultData?.contact || ''
     }
})

watch(() => visible.value, () => {
     if(props.mode === 'edit') {
          title.value = props?.defaultData?.title || ''
          description.value = props?.defaultData?.description || ''
          contact.value = props?.defaultData?.contact || ''
     }
})
</script>

<template>
  <div>
    <Button :label="props.label" @click="visible = true" />

    <Dialog
      v-model:visible="visible"
      modal
      header="Ticket Form"
      class="w-[90%]"
    >
      <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span> -->
      <form @submit="onSubmit">
        <!-- <div class="flex items-center gap-4">
          <label for="title" class="font-semibold w-24">Title</label>
          <InputText
            v-model="title"
             v-bind="titleAttrs"
            id="title"
            name="title"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <ErrorMessage class="text-red-500 text-sm" name="title" /> -->
        <div class="mb-4">
          <label for="title" class="font-semibold w-24">Title</label>
          <InputText
            v-model="title"
             v-bind="titleAttrs"
            id="title"
            name="title"
            class="w-full"
            autocomplete="off"
          />
          <span class="text-red-500 text-sm">
               {{ errors.title }}
          </span>
        </div>
        <div class="mb-4">
          <label for="description" class="font-semibold w-24">Description</label>
          <Textarea
            v-model="description"
            v-bind="descriptionAttrs"
            id="description"
            class="w-full"
            autocomplete="off"
          />
          <span class="text-red-500 text-sm">
               {{ errors.description }}
          </span>
        </div>
        <div class="mb-4">
          <label for="contact" class="font-semibold w-24">Contact</label>
          <InputText
            v-model="contact"
            v-bind="contactAttrs"
            id="contact"
            class="w-full"
            autocomplete="off"
          />
          <span class="text-red-500 text-sm">
               {{ errors.contact }}
          </span>
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="submit" label="Save"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
