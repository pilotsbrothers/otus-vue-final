<template>
  <section class="page-block">
    <sms-form :id="props.id"></sms-form>
  </section>
</template>
<script setup>
import SmsForm from '../../components/Sms/SmsForm.vue'
const props = defineProps({
  id: {
    type: Number,
    default: null
  }
})
</script>
