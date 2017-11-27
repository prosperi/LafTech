import React from 'react'
import { Container, Grid, List } from 'semantic-ui-react'

const FooterSection = () => {
  return (
    <Container className='footer-container' fluid>
      <Grid className='footer-content' columns={2}>
        <Grid.Column width={8} style={{textAlign: 'right', padding: '20px'}}>
          <p style={{fontSize: '14pt', color: 'rgba(255, 255, 255, .5)'}}>SOURCES</p>

          <List>
            <List.Item as='a'>What is a FAQ?</List.Item>
            <List.Item as='a'>Who is our user?</List.Item>
            <List.Item as='a'>Where is our office located?</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={8} style={{padding: '20px'}}>
          <p style={{fontSize: '14pt', color: 'rgba(255, 255, 255, .5)'}}>LINKS</p>
          <List>
            <List.Item as='a'>What is a FAQ?</List.Item>
            <List.Item as='a'>Who is our user?</List.Item>
            <List.Item as='a'>Where is our office located?</List.Item>
          </List>
        </Grid.Column>
      </Grid>

      <p style={{marginTop: '30px', marginBottom: '10px', textAlign: 'center', color: 'rgba(255, 255, 255, .5)'}}>
        Copyright(2017-2018) - Lafayette College
      </p>
    </Container>
  )
}

export default FooterSection
