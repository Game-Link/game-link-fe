import React from 'react';
import {AccordionSecction, Accoridion} from '@src/components';
import {LoLRankInfo} from '@src/api';

import UserRankInfo from './user-rank-info';

type Props = {
  soloRank?: LoLRankInfo | null | undefined;
  teamRank?: LoLRankInfo | null | undefined;
};
export default function MypageAccordion({soloRank, teamRank}: Props) {
  return (
    <AccordionSecction>
      <Accoridion title="SOLO LANK" expanded={true}>
        {soloRank ? <UserRankInfo {...soloRank} /> : null}
      </Accoridion>
      <Accoridion title="TEAM LANK">
        {teamRank ? <UserRankInfo {...teamRank} /> : null}
      </Accoridion>
      <Accoridion title="MATCH DETAIL">
        {teamRank ? <UserRankInfo {...teamRank} /> : null}
      </Accoridion>
    </AccordionSecction>
  );
}
