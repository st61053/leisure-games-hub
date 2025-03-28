package org.example.backend.dto;

import java.util.List;

public class ActionResponseDto {
    private List<ActionResultDto> success;

    public ActionResponseDto(List<ActionResultDto> success) {
        this.success = success;
    }

    public List<ActionResultDto> getSuccess() {
        return success;
    }
}

