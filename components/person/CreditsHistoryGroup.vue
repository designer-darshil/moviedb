<template>
  <tr class="odd:bg-surface-2/40">
    <td class="p-0">
      <table class="w-full border-collapse">
        <tbody>
          <CreditsHistoryItem
            v-for="credit in group.credits"
            :key="`credit-${credit.credit_id}`"
            :year="group.year"
            :credit="credit"
          />
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
import CreditsHistoryItem from '~/components/person/CreditsHistoryItem';

export default {
  components: {
    CreditsHistoryItem,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
