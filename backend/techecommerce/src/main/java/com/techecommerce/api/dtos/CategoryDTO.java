package com.techecommerce.api.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryDTO {
    @JsonProperty(defaultValue = "null")
    @ApiModelProperty(accessMode = ApiModelProperty.AccessMode.READ_ONLY)
    private UUID id;
    private String name;
}
