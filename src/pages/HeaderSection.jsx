import React, { Component } from 'react'
import { Link } from 'react-router'
import { Container, Menu, Image, Header, Icon, Search } from 'semantic-ui-react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class HeaderSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      value: '',
      results: []
    }
    this.cancelToken = axios.CancelToken
    this.source = this.cancelToken.source
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => browserHistory.push(`/school/${result.key}`)

  handleSearchChange = (e, { value }) => {
    if (this.source.cancel) {
      this.source.cancel()
    }
    this.setState({ isLoading: true, value, results: [] }, () => {
      if (this.state.value.length < 3) return this.setState({isLoading: false, results: []})
      axios.get(`http://localhost:3001/api/v1/school/search/${this.state.value}/`, {
        cancelToken: this.source.token,
        responseType: 'json'
      })
      .then(response => {
        const results = response.data.map(({state_school_id, school_add_city, school_name}) => {
          return {
            key: state_school_id,
            title: school_name,
            description: school_add_city
          }
        })

        this.setState({
          results: results,
          isLoading: false
        }, () => {
          this.forceUpdate()
        })
      })
    })
  }

  render () {
    const { isLoading, value, results } = this.state
    return (

      <Container className='header-container' fluid>
        <Menu secondary className='mainMenu'>
          <Menu.Item name='lafTechVisualization' active as={Link} to='/' />
          <Menu.Item name='dataset' as={Link} target='_blank' to='http://www.laf-tech.org' />
          <Menu.Menu position='right' className='header-search'>
            <Menu.Item>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                placeholder='Search for schools...'
              />
            </Menu.Item>
            <Menu.Item name='contact us' as={Link} onClick={() => window.open('https://github.com/prosperi/LafTech')} />
          </Menu.Menu>
        </Menu>

        <Container className='index-header' fluid>
          <Container className='content' fluid>
            <Link to='/'><Image src='../images/logo.png' className='logo' /></Link>
            <Header as='h1' className='title' >LAFTECH PA SCHOOL DATA</Header>
            <Header as='h3' className='hint' >EXPLORE OUR ANALYSIS</Header>
            <Icon name='angle down' size='huge' className='down' />
          </Container>
        </Container>

      </Container>
    )
  }
}

export default HeaderSection
