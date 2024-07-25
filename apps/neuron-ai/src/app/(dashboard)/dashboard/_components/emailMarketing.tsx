import React from "react";

import { CustomersTable } from "./tables";
import CampaignHandler from "./campaignHandler";

const EmailMarketing = () => {
  return (
    <div className="my-4">
      <div className="flex gap-4">
        <div className="flex-[0.2]">
          <CustomersTable />
        </div>
        <div className="flex-1">
          <CampaignHandler />
        </div>
      </div>
    </div>
  );
};

export default EmailMarketing;
