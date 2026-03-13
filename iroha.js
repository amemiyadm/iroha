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
        trigger.addEventListener('click', () => this.toggle(trigger));
    }

    static attachAll() {
        for (const trigger of document.querySelectorAll('.iroha-trigger')) {
            this.attach(trigger);
        }
    }

    static toggle(trigger) {
        const panel = document.getElementById(trigger.dataset.irohaTargetId);
        const isOpen = (panel.dataset.irohaIsOpen === 'true');

        panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0';
        panel.offsetHeight;
        panel.style.maxHeight = isOpen ? '0' : panel.scrollHeight + 'px';
        panel.dataset.irohaIsOpen = String(!isOpen);

        if (!isOpen) {
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
