<template>
  <tr :class="$style.group">
    <td :class="$style.row">
      <table :class="$style.subTable">
        <tbody>
          <CreditsHistoryItem
            v-for="credit in group.credits"
            :key="`credit-${credit.credit_id}`"
            :year="group.year"
            :credit="credit" />
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

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.group {
  background-color: transparent;
}

.row {
  padding: 0 !important;
  border-bottom: none !important;
}

.subTable {
  width: 100%;
  border-collapse: collapse;
}
</style>
