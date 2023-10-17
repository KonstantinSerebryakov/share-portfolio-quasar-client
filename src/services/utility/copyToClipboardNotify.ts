import { Notify, copyToClipboard } from 'quasar';

export async function copyToClipboardNotify(value: string) {
  copyToClipboard(value).then(() => {
    Notify.create({
      timeout: 50,
      message: 'Copied to clipboard!',
      type: 'info',
    });
  });
}
