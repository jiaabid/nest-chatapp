import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    media: string;

    @ApiProperty({
        example: {
            linkTitle: "abc",
            linkUrl: "xyz"
        }
    })
    outerLink: {

        linkTitle: string;

        linkUrl: string
    }

    @ApiProperty({
        example: {
            linkTitle: "abc",
            linkUrl: "xyz"
        }
    })
    link: {
        linkTitle: string
        linkUrl: string
    };

    @ApiProperty()
    description?: string;
}
