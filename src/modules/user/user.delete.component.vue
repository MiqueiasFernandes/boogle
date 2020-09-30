<template>
  <div hidden>deletar user user {{ userId }}</div>
</template>

<script>
import DeleteDialog from "@/shared/utils/delete.entity.dialog";
import ChangeEntityAlert from "@/shared/utils/change.entity.alert";
import GoTo from "@/shared/utils/go.to.router";
export default {
  props: ["userId"],
  created() {
    DeleteDialog.show(this, "User", this.userId, this.remover);
  },
  methods: {
    remover() {
      ChangeEntityAlert.alert(this, "User", this.userId, "remover");
      GoTo.back(this.$router);
    },
  },
};
</script>