package com.techecommerce.messagingcore.dtos;

import com.techecommerce.main.dtos.OrderDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderMessageDTO extends AbstractMessageDTO<OrderDTO> {
}
