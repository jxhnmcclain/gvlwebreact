import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProposalTemplate from '../components/proposals/ProposalTemplate';
import { getProposalById } from '../content/proposals';

const ProposalPage = () => {
  const { proposalId = '' } = useParams();
  const proposal = getProposalById(proposalId);

  if (!proposal) {
    return <Navigate to="/404" replace />;
  }

  return <ProposalTemplate proposal={proposal} />;
};

export default ProposalPage;
