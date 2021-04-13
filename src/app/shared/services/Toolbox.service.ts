class ToolboxService {
    /**
     * Generates RFC4122-compliant v4 GUID.
     *
     * @return {string}
     */
    public genNewId(): string {
        /**
         *
         * @param flag {boolean}
         * @returns {string}
         */
        function p8(flag: boolean) {
            const p = (Math.random().toString(16) + '000000000').substr(2, 8);
            return flag ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
        }

        return p8(false) + p8(true) + p8(true) + p8(false);
    }
}

export const toolboxService = new ToolboxService();
