// AccountProfileCardChildEdit.mixin.ts
import { Emitter } from 'mitt';
import { EditableCardEvents } from './events';

export const AccountProfileCardChildEditMixin = {
  props: {
    emitter: {
      type: Object as () => Emitter<EditableCardEvents> | null,
      default: null,
    },
  },
  methods: {
    handleCancel(this: { exitEditMode: () => void }) {
      this.exitEditMode();
    },
    exitEditMode(this: { emitter: Emitter<EditableCardEvents> | null }) {
      this.emitter?.emit('ExitEdit', '');
    },
  },
};
