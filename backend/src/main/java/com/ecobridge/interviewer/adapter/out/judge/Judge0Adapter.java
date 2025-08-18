package com.ecobridge.interviewer.adapter.out.judge;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Score;
import com.ecobridge.interviewer.dto.RunRequestDTO;
import com.ecobridge.interviewer.dto.RunResultDTO;

public interface Judge0Adapter {
  Score score(Answer answer);

  RunResultDTO dryRun(RunRequestDTO dto); // << NEW
}
