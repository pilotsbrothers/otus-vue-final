<template>
  <section class="page-block">
    <email-form :id="props.id"></email-form>
  </section>
</template>
<script setup>
import EmailForm from '../../components/Emails/EmailForm.vue'
const props = defineProps({
  id: {
    type: Number,
    default: null
  }
})
</script>
