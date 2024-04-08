interface ImportMetaEnv {
    readonly VITE_CARDS_API_HOST: string;
    readonly VITE_AI_GENERATOR_API_HOST: string;
    readonly VITE_MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}