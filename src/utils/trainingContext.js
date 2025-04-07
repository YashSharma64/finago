/**
 * Utility to load and process training data for Finago AI
 * This creates a context string that can be included in API requests
 */

// Helper function to fetch and parse JSON files
const loadJsonFile = async (path) => {
  try {
    const response = await fetch(path);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    return null;
  }
};

// Load all training data files and build context
export const buildTrainingContext = async () => {
  try {
    // Load main configuration
    const aiConfig = await loadJsonFile('/src/Training-data/ai_config.json');
    const identity = await loadJsonFile('/src/Training-data/identity.json');
    
    // Load guidelines
    const financialAdviceGuidelines = await loadJsonFile('/src/Training-data/guidelines/financial_advice.json');
    const investmentsGuidelines = await loadJsonFile('/src/Training-data/guidelines/investments.json');
    const budgetingGuidelines = await loadJsonFile('/src/Training-data/guidelines/budgeting.json');
    
    // Load restrictions
    const contentRestrictions = await loadJsonFile('/src/Training-data/restrictions/content_restrictions.json');
    
    // Build the context string
    let context = `
# FINAGO AI ASSISTANT TRAINING CONTEXT

## Core Identity
Name: ${aiConfig?.name || 'Finago'}
Description: ${aiConfig?.description || 'AI financial advisor'}

## About Finago
${identity?.identity?.what_is || ''}
Created by: ${identity?.identity?.created_by || ''}

## Capabilities
${identity?.identity?.capabilities?.map(cap => `- ${cap}`).join('\n') || ''}

## Limitations
${identity?.identity?.limitations?.map(limit => `- ${limit}`).join('\n') || ''}
${aiConfig?.limitations?.map(limit => `- ${limit}`).join('\n') || ''}

## Communication Style
Tone: ${aiConfig?.personality?.tone || 'professional but friendly'}
Style: ${aiConfig?.personality?.communication_style || 'clear, concise, and educational'}
Formality: ${aiConfig?.personality?.formality_level || 'semi-formal'}

## Content Guidelines
${financialAdviceGuidelines?.guidelines?.map(guideline => `- ${guideline}`).join('\n') || ''}
${investmentsGuidelines?.guidelines?.map(guideline => `- ${guideline}`).join('\n') || ''}
${budgetingGuidelines?.guidelines?.map(guideline => `- ${guideline}`).join('\n') || ''}

## Content Restrictions
Prohibited topics:
${contentRestrictions?.prohibited_topics?.map(topic => `- ${topic}`).join('\n') || ''}

Topics requiring disclaimers:
${contentRestrictions?.sensitive_topics_requiring_disclaimers?.map(topic => `- ${topic}`).join('\n') || ''}

## Standard Responses
For questions about Finago itself: "${identity?.standard_responses?.about_me || ''}"
For privacy concerns: "${identity?.standard_responses?.privacy_policy || ''}"
For usage questions: "${identity?.standard_responses?.how_to_use || ''}"
For requests outside capabilities: "${identity?.standard_responses?.cannot_help || ''}"

## Formatting
- Use markdown formatting with heading levels to structure responses
- Bold important points and key terms
- Use tables for comparisons when relevant
- Use bullet points for lists and steps
- Include relevant disclaimers when discussing sensitive topics
`;

    return context;
  } catch (error) {
    console.error('Error building training context:', error);
    return '';
  }
};

// Function to get specific sample response templates by topic
export const getSampleResponse = async (topic) => {
  try {
    if (topic.includes('budget')) {
      return await loadJsonFile('/src/Training-data/responses/budgeting.json');
    } else if (topic.includes('invest') || topic.includes('stock') || topic.includes('fund')) {
      return await loadJsonFile('/src/Training-data/responses/investment_basics.json');
    } else if (topic.includes('emergency') || topic.includes('fund') || topic.includes('saving')) {
      return await loadJsonFile('/src/Training-data/responses/emergency_fund.json');
    }
    return null;
  } catch (error) {
    console.error('Error loading sample response:', error);
    return null;
  }
};