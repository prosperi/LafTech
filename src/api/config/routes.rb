Rails.application.routes.draw do

  scope '/api' do
    scope '/v1' do
      scope '/visualizations' do
        scope '/1' do
          get '/' => 'api#visualization_1'
        end
        scope '/2/:grade/:academic_year_start' do
          get '/' => 'api#visualization_2'
        end
        scope '/3' do
          get '/' => 'api#visualization_3'
        end
      end
      scope '/map' do
        get '/' => 'api#map'
        scope '/:county_id' do
          get '/' => 'api#map_county'
        end
      end
      scope '/county' do
        scope '/list' do
          get '/' => 'api#list_counties'
        end
        scope '/:county_id/schools' do
          get '/' => 'api#list_schools'
        end
        scope '/details' do
          scope '/:county_id' do
            get '/' => 'api#details_county'
          end
        end
      end
      scope '/school' do
        scope '/:school_id' do
          get '/' => 'api#school_details'
        end
        scope '/search/:query' do
          get '/' => 'api#search_schools'
        end
      end
    end
  end
  get '/' => 'api#index'

end
