const loadJsonFile = async (path) => {
  try {
    const response = await fetch(path);
    return await response.json();
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return null;
  }
};

export const buildTrainingContext = async () => {
  try {
    const [aiConfig, identity, financialAdvice, investments, budgeting, restrictions] = await Promise.all([
      loadJsonFile('/src/Training-data/ai_config.json'),
      loadJsonFile('/src/Training-data/identity.json'),
      loadJsonFile('/src/Training-data/guidelines/financial_advice.json'),
      loadJsonFile('/src/Training-data/guidelines/investments.json'),
      loadJsonFile('/src/Training-data/guidelines/budgeting.json'),
      loadJsonFile('/src/Training-data/restrictions/content_restrictions.json')
    ]);

    return `
# FINAGO AI ASSISTANT CONTEXT

## Identity
Name: ${aiConfig?.name || 'Finago'}
Description: ${aiConfig?.description || 'AI financial advisor'}
Created by: ${identity?.identity?.created_by || 'Finago Team'}

## Capabilities
${identity?.identity?.capabilities?.map(cap => `- ${cap}`).join('\n') || ''}

## Guidelines
${financialAdvice?.guidelines?.map(g => `- ${g}`).join('\n') || ''}
${investments?.guidelines?.map(g => `- ${g}`).join('\n') || ''}
${budgeting?.guidelines?.map(g => `- ${g}`).join('\n') || ''}

## Restrictions
Prohibited: ${restrictions?.prohibited_topics?.join(', ') || ''}
Sensitive: ${restrictions?.sensitive_topics_requiring_disclaimers?.join(', ') || ''}

## Style
Tone: ${aiConfig?.personality?.tone || 'professional'}
Style: ${aiConfig?.personality?.communication_style || 'educational'}
`;
  } catch (error) {
    console.error('Error building context:', error);
    return '';
  }
};

export const getSampleResponse = async (topic) => {
  const query = topic.toLowerCase();
  if (query.includes('budget')) return loadJsonFile('/src/Training-data/responses/budgeting.json');
  if (query.includes('invest')) return loadJsonFile('/src/Training-data/responses/investment_basics.json');
  if (query.includes('emergency')) return loadJsonFile('/src/Training-data/responses/emergency_fund.json');
  return null;
};