export default {
    show(src, entity, id, callback) {
        src.$dialog(
            {
                width: "30em",
                title: "Delete " + entity,
                icon: "trash",
                btns: [
                    {
                        label: "Delete",
                        action: "delete",
                        color: "danger",
                        close: true,
                        icon: "x",
                    },
                    { label: "Cancel", action: "cancel", close: true, icon: "check" },
                ],
                text: 'Tem certeza que deseja remover o usuario ' + id
            },
            (action) => {
                if (action === 'delete') {
                    callback()
                }
            }
        );
    }
}
