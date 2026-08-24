import { gradoClimaProposal } from './gradoclima';
import { socialMediaBaseProposal } from './social-media-base';
import { mailingAuthorityBaseProposal } from './mailing-authority-base';
import { marketingAutomationBaseProposal } from './marketing-automation-base';
import type { ProposalData } from '../../lib/proposals/types';

const proposals: Record<string, ProposalData> = {
  [gradoClimaProposal.id]: gradoClimaProposal,
  [socialMediaBaseProposal.id]: socialMediaBaseProposal,
  [mailingAuthorityBaseProposal.id]: mailingAuthorityBaseProposal,
  [marketingAutomationBaseProposal.id]: marketingAutomationBaseProposal,
};

export function getProposalById(id: string): ProposalData | undefined {
  return proposals[id];
}
