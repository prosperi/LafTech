Rails.application.routes.draw do
  get 'api/new'

  scope '/api' do
    scope '/v1' do
      scope '/visualizations' do
        scope '/1' do
          get '/' => 'api#visualization_1'
        end
        scope '/2' do
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
      scope '/details' do
        scope '/county' do
          scope '/:county_id' do
            get '/' => 'api#details_county'
          end
        end
        scope '/school' do
          scope '/:school_id' do
            get '/' => 'api#details_county'
          end
        end
      end
    end
  end
end
