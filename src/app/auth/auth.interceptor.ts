import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem("access_token")

    if (
      ((!request.url.endsWith("**/products") && request.method !== 'GET' ) &&
      !request.url.endsWith("**/login") &&
      !request.url.endsWith("**/register")) &&
      accessToken) {
      request = request.clone({
          headers: request.headers
            .set("Authorization", "Bearer " + accessToken).set("Access-Control-Allow-Origin", "*")
        }
      );
    }
    request = request.clone({
      headers: request.headers
        .set("Accept", "*/*").set("Access-Control-Allow-Origin", "*").set("Allow-Origin", "*")
    })

    return next.handle(request);
  }
}

