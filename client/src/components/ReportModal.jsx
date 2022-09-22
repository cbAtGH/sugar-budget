import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import ReportContent from "./ReportContent";
import { generateTotalReport } from "../utils/reportUtils";

const ReportModal = ({ data, loading, error, period }) => {
  const [report, setReport] = useState({});
  let buttonColor = "standard";
  if (error) buttonColor = "red";
  else if (loading) buttonColor = "grey";
  else buttonColor = "green";

  return (
    <Modal
      trigger={
        <Button
          disabled={error}
          loading={loading}
          color={buttonColor}
          onClick={() => setReport(generateTotalReport(data[period]))}
        >
          Generate Report
        </Button>
      }
    >
      <Modal.Content>
        <ReportContent report={report} />
      </Modal.Content>
    </Modal>
  );
};

export default ReportModal;
