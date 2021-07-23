import Document from 'next/document'
import outputcss from '!raw-loader!../styles/output.css';

// const cssFile = process.env.NODE_ENV === 'production' ? outputcss : tailwindcss;
const cssFile =  outputcss ;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style amp-custom dangerouslySetInnerHTML={{
              __html: cssFile
            }} />
          </>
        )
      }
  }
}

export default MyDocument