package com.example.schoolManage.model.DTO;

import lombok.Builder;

@Builder
public record MailBodyDto(String to, String subject, String text) {
}
