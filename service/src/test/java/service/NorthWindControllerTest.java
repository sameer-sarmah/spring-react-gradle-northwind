package service;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;

import rest.NorthWindController;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest({NorthWindController.class})
@ContextConfiguration(classes = {TestAppConfig.class})
public class NorthWindControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private NorthWindController northWindController;
	
    @Test
    public void getProducts(){
    	try {
			mockMvc.perform(get("/Products"))
			.andExpect(status().isOk())
			.andDo(print())
			.andExpect(header().string("Content-Type", "application/json;charset=UTF-8"))
			.andExpect(jsonPath("$.value[0].ProductID").isNumber())
			.andExpect(jsonPath("$.value[0].ProductName").isString())
			.andExpect(jsonPath("$.value[0].QuantityPerUnit").isString());
		} catch (Exception e) {
			e.printStackTrace();
			 Assert.fail(e.getMessage());
		}
    }
    
    @Test
    public void test() {
    	Assert.assertEquals(1, 1);
    }
    
    public static ResultHandler print() {
        return new ResultHandler() {
            @Override
            public void handle(MvcResult res) throws Exception {
                System.out.println(res.getResponse().getContentAsString());
            }
        };
    }
}
