package rest;

import client.HttpClient;
import client.HttpMethod;
import exceptions.CoreException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.yaml.snakeyaml.util.ArrayUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
public class NorthWindController {
    private final String service="https://services.odata.org/Northwind/Northwind.svc/Products?$format=json";

  final  HttpClient httpClient=new HttpClient();

    @Autowired
    private HttpServletRequest request;

    @RequestMapping( value = "/Products",method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getProducts() {
        Map<String,String> headers = this.getHeaders(this.request);
        Map<String,String> queryParams =this.getQueryParameters(this.request);
        String jsonResponse="";
        try {
            jsonResponse = httpClient.request(this.service, HttpMethod.GET, Collections.<String, String>emptyMap(),queryParams,null);
            System.out.println(jsonResponse);
        } catch (CoreException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>(jsonResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/Products/$count",method = RequestMethod.GET)
    public ResponseEntity<Integer> getProductCount() {

        String countURL=this.service+"/$count";
        this.request.getHeaderNames();
        String count= "0";
        try {
            count = httpClient.request(countURL, HttpMethod.GET, Collections.<String, String>emptyMap(),Collections.<String, String>emptyMap(),null);
        } catch (CoreException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Integer>(Integer.parseInt(count), HttpStatus.OK);
    }

    private Map<String,String> getHeaders(HttpServletRequest request){
        Map<String, String> headers = new HashMap<>();
        List<String> headerNames = Collections.list(request.getHeaderNames());

        headerNames.stream().forEach((header)->{
            headers.put(header,request.getHeader(header));
        });

        return headers;
    }

    private Map<String, String> getQueryParameters(HttpServletRequest request) {
        Map<String, String> queryParameters = new HashMap<>();
        String queryString = request.getQueryString();

        if (StringUtils.isEmpty(queryString)) {
            return queryParameters;
        }

        String[] parameters = queryString.split("&");

        Arrays.stream(parameters).forEach((String queryParam)->{
            String[] keyValuePair = queryParam.split("=");
            String key=keyValuePair[0];
            String value=keyValuePair[1];
            queryParameters.put(key,value);
        });

        return queryParameters;
    }
}
