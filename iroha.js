export class Iroha {
    static delegate(root = document) {
        root.addEventListener('click', (e) => {
            const trigger = e.target.closest('.iroha-trigger');
            if (trigger) {
                this.toggle(trigger);
            }
        });
    }

    static attach(trigger) {
        trigger.addEventListener('click', () => {
            this.toggle(trigger);
        });
    }

    static attachAll() {
        for (const trigger of document.querySelectorAll('.iroha-trigger')) {
            this.attach(trigger);
        }
    }

    static toggle(trigger) {
        const panel = document.getElementById(trigger.dataset.irohaTargetId);

        if (!panel) return;

        if (panel.dataset.irohaIsOpen === 'true') {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            panel.offsetHeight;
            panel.style.maxHeight = '0px';
            panel.dataset.irohaIsOpen = 'false';
        } else {
            const parent = panel.parentElement?.closest('.iroha-panel');
            if (parent) {
                parent.style.maxHeight = 'none';
            }

            panel.style.maxHeight = '0px';
            panel.offsetHeight;
            panel.style.maxHeight = panel.scrollHeight + 'px';
            panel.dataset.irohaIsOpen = 'true';

            panel.addEventListener('transitionend', function handler(e) {
                if (e.propertyName !== 'max-height') return;

                if (panel.dataset.irohaIsOpen === 'true') {
                    panel.style.maxHeight = 'none';
                }

                panel.removeEventListener('transitionend', handler);
            });
        }
    }
}
