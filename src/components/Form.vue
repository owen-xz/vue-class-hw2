<template>
  <Form @submit="onSubmit">
    <div
      class="mb-3"
      v-for="{
        as,
        name,
        label,
        children,
        placeholder,
        ...attrs
      } in schema.fields"
      :key="name"
    >
      <label :for="name">{{ label }}</label>
      <Field
        class="form-control"
        :as="as"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        v-bind="attrs"
      >
        <template v-if="children && children.length">
          <component
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs"
          >
            {{ text }}
          </component>
        </template>
      </Field>
      <ErrorMessage class="text-danger" :name="name" />
    </div>
    <div class="text-end mt-3">
      <button class="btn btn-primary">{{ props.submitBtn }}</button>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  submitBtn: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['onSubmit'])
const onSubmit = (values) => {
  emit('onSubmit', values)
}
</script>

<style lang="scss" scoped></style>
