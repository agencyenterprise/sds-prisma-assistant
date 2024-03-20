export const config = {
  isWebsiteMode: process.env.NEXT_PUBLIC_WEBSITE_MODE === 'true',
  openai: {
    apiKey:
      process.env.OPENAI_API_KEY! ||
      process.env.PRISMA_ASSISTANT_OPENAI_API_KEY! ||
      process.env.PRISMA_ASSIST_OPENAI_API_KEY!,
    baseURL:
      process.env.OPENAI_API_BASE_URL ||
      process.env.PRISMA_ASSIST_OPENAI_API_BASE_URL!,
    model:
      process.env.PRISMA_ASSIST_OPENAI_API_BASE_URL! || 'gpt-4-turbo-preview',
  },
}
