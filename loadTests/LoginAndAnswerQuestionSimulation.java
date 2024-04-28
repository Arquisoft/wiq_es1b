
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class LoginAndAnswerQuestionSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://20.26.114.153:8000")
    .inferHtmlResources()
    .acceptHeader("application/json, text/plain, */*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    Map.entry("Upgrade-Insecure-Requests", "1")
  );
  
  private Map<CharSequence, String> headers_1 = Map.of("Accept", "image/avif,image/webp,*/*");
  
  private Map<CharSequence, String> headers_2 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"c37f40b9c4eb0e25afb946dc87f118ade0cac74e\"")
  );
  
  private Map<CharSequence, String> headers_3 = Map.ofEntries(
    Map.entry("Accept", "video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5"),
    Map.entry("Accept-Encoding", "identity"),
    Map.entry("If-None-Match", "\"f270211063c6bc7f5bd72cd0cecb81c5008bb18e\""),
    Map.entry("Range", "bytes=0-")
  );
  
  private Map<CharSequence, String> headers_4 = Map.ofEntries(
    Map.entry("Accept", "*/*"),
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "http://20.26.114.153:3000")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "http://20.26.114.153:3000")
  );
  
  private Map<CharSequence, String> headers_6 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"87180353595bd9914dbc0ef45a176603ae68a100\"")
  );
  
  private Map<CharSequence, String> headers_7 = Map.of("Origin", "http://20.26.114.153:3000");
  
  private String uri1 = "20.26.114.153";

  private ScenarioBuilder scn = scenario("LoginAndAnswerQuestionSimulation")
    .exec(
      http("request_0")
        .get("http://" + uri1 + ":3000/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":3000/static/media/favicon2.e132ec28987203b8f277.ico")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":3000/static/media/favicon2.e132ec28987203b8f277.ico")
            .headers(headers_2),
          http("request_3")
            .get("http://" + uri1 + ":3000/Line_Network_Background_2.mp4")
            .headers(headers_3)
        ),
      pause(6),
      http("request_4")
        .options("/login")
        .headers(headers_4)
        .resources(
          http("request_5")
            .post("/login")
            .headers(headers_5)
            .body(RawFileBody("loginandanswerquestionsimulation/0005_request.json")),
          http("request_6")
            .get("http://" + uri1 + ":3000/static/media/logo.0d90bc21531252d88337ce6dcc49f7f0.svg")
            .headers(headers_6)
        ),
      pause(1),
      http("request_7")
        .get("/getQuestion?category=todo")
        .headers(headers_7),
      pause(2),
      http("request_8")
        .options("/saveQuestion")
        .headers(headers_4)
        .resources(
          http("request_9")
            .post("/saveQuestion")
            .headers(headers_5)
            .body(RawFileBody("loginandanswerquestionsimulation/0009_request.json"))
        )
    );

  {
	  setUp(
      scn.injectOpen(constantUsersPerSec(2).during(60).randomized())
    ).protocols(httpProtocol);
  }
}
