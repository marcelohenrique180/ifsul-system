package config;

import org.springframework.test.context.TestContext;
import org.springframework.test.context.support.AbstractTestExecutionListener;

import java.lang.annotation.Annotation;

public class ResetKeysTestExecutionListener extends AbstractTestExecutionListener {

    @Override
    public void beforeTestMethod(TestContext testContext) throws Exception {
        Class c = testContext.getTestClass();
        if(c.isAnnotationPresent(ResetKeys.class)){
            Annotation annotation = c.getAnnotation(ResetKeys.class);
            ResetKeys resetKeys = (ResetKeys) annotation;

            DbTestUtil.resetAutoIncrementColumns(
                    testContext.getApplicationContext(),
                    resetKeys.table(),
                    Integer.parseInt(resetKeys.index())
            );
        }
        super.beforeTestMethod(testContext);
    }


}
