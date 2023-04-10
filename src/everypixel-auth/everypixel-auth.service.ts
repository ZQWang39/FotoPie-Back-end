import { Injectable } from "@nestjs/common";
import { ClientCredentials } from "simple-oauth2";
import axios from "axios";

@Injectable()
export class MyService {
  private readonly oauth2: ClientCredentials;
  private readonly tokenConfig = {
    scope: "openid", // Set the scope based on the API documentation
  };

  constructor() {
    const client = {
      client: {
        id: "rLrbHpMTL08gq5xFUpkU6JF3",
        secret: "PbEaAgGQdipZrY3btXMarU2H0mF6J9oickhvAStaDCBUAcDK",
      },
      auth: {
        tokenHost: "https://api.everypixel.com",
        tokenPath: "/oauth/token",
      },
    };
    this.oauth2 = new ClientCredentials(client);
  }

  async getToken(): Promise<string> {
    try {
      const result = await this.oauth2.getToken(this.tokenConfig);
      return result.token.access_token;
    } catch (error) {
      console.error("Error fetching token", error);
      return "";
    }
  }

  // async fetchData(): Promise<any> {
  //   const token = await this.getToken();
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const url = "https://api.everypixel.com/some/api/endpoint";
  //   const response = await axios.get(url, { headers });
  //   return response.data;
  // }

  async getQuality(params: {
    url?: string;
    data?: Record<string, any>;
  }): Promise<any> {
    const token = await this.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      if (params.url) {
        const response = await axios
          .get("https://api.everypixel.com/v1/quality_ugc", {
            headers,
            params,
          })
          //.toPromise();
        return response.data;
      // } else if (params.data) {
      //   const formData = new FormData();
      //   formData.append("data", params.data, "image.jpg");
      //   const response = await this.httpService
      //     .post("https://api.everypixel.com/v1/quality_ugc", formData, {
      //       headers: {
      //         ...headers,
      //         ...formData.getHeaders(),
      //       },
      //     })
      //     .toPromise();
      //   return response.data;
      } else {
        throw new Error('Either "url" or "data" parameter is required.');
      }
    } catch (error) {
      console.error("Error fetching quality", error);
      return "";
    }
  }
}
