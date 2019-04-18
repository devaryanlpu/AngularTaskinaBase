// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  siteDescription: "",
  siteTitle: "Taskina",
  production: false,
  siteUrl: null,
  siteApiUrl: null,
  intercomKey: null,
  storage: {
    auth: {
      accessToken: "access_token",
      profileId: "profileSysId",
      thumbnailImageName: "thumbnailImageName",
      loginWithTaskina: "loginWithTaskina",
      refreshtoken: "refresh_token",
      userName: "username",
      isOnTaskinaSite: "isOnTaskinaSite",
      currentProfileId: "currentProfileSysId",
      fullName: "fullname"
    }
  },
  site: {
    get url() {
      return environment.siteUrl;
    },

    get api() {
      return environment.siteApiUrl;
    }
  },
  endpoints: {
    auth: {
      get url() {
        return `${environment.siteApiUrl}/auth/login`;
      },
      get siteApiUrl() {
        return environment.siteApiUrl;
      }
    }
}
};

