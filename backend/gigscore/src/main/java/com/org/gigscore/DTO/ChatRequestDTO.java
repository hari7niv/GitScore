package com.org.gigscore.DTO;

import java.util.List;

public record ChatRequestDTO(List<ChatMessageDTO> messages) {
}
